"use server";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
} from "./shared.types";

// export async function getQuestions(params: GetQuestionsParams) {
//   try {
//     connectToDatabase();

//     const { searchQuery, filter, page = 1, pageSize = 10 } = params;

//     // Calculcate the number of posts to skip based on the page number and page size
//     const skipAmount = (page - 1) * pageSize;

//     const query: FilterQuery<typeof Question> = {};

//     if (searchQuery) {
//       const escapedSearchQuery = searchQuery.replace(
//         /[.*+?^${}()|[\]\\]/g,
//         "\\$&"
//       );
//       query.$or = [
//         { title: { $regex: new RegExp(escapedSearchQuery, "i") } },
//         { content: { $regex: new RegExp(escapedSearchQuery, "i") } },
//       ];
//     }

//     let sortOptions = {};

//     switch (filter) {
//       case "newest":
//         sortOptions = { createdAt: -1 };
//         break;
//       case "frequent":
//         sortOptions = { views: -1 };
//         break;
//       case "unanswered":
//         query.answers = { $size: 0 };
//         break;
//       default:
//         break;
//     }

//     const questions = await Question.find(query)
//       .populate({ path: "tags", model: Tag })
//       .populate({ path: "author", model: User })
//       .skip(skipAmount)
//       .limit(pageSize)
//       .sort(sortOptions);

//     const totalQuestions = await Question.countDocuments(query);

//     const isNext = totalQuestions > skipAmount + questions.length;

//     return { questions, isNext };
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, tags, path } = params;

    // Create the question
    const question = await Question.create({
      title,
      content,
    });

    const tagDocuments = [];

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    throw new Error("Failed to create question");
  }
}

// export async function getQuestionById(params: GetQuestionByIdParams) {
//   try {
//     connectToDatabase();

//     const { questionId } = params;

//     const question = await Question.findById(questionId)
//       .populate({ path: "tags", model: Tag, select: "_id name" })
//       .populate({
//         path: "author",
//         model: User,
//         select: "_id clerkId name picture",
//       });

//     return question;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );

    revalidatePath(path);
  } catch (error) {
    throw new Error("Failed to delete question");
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, title, content, path } = params;

    const question = await Question.findById(questionId).populate("tags");

    if (!question) {
      throw new Error("Question not found");
    }

    question.title = title;
    question.content = content;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    throw new Error("Failed to edit question");
  }
}
