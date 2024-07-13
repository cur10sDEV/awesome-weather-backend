import { User } from "@/models/user.model";
import { IUserRegistration } from "@/types/user";

export class UserRepo {
  static async getUserByClerkId(clerkId: string) {
    const user = await User.findOne({ clerkId: clerkId });

    return user;
  }

  static async createUser(data: IUserRegistration) {
    const user = await User.create({
      clerkId: data.clerkId,
      email: data.email,
      avatar: data.avatar,
      username: data.username,
    });

    return user;
  }

  static async updateUser(data: IUserRegistration) {
    const user = await User.findOneAndUpdate(
      { clerkId: data.clerkId },
      {
        clerkId: data.clerkId,
        email: data.email,
        avatar: data.avatar,
        username: data.username,
      }
    );

    return user;
  }

  static async deleteUser(clerkId: string) {
    const user = await User.findOneAndDelete({ clerkId: clerkId });

    return user;
  }
}
