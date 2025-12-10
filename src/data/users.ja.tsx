import { sortBy } from "@site/src/utils/jsUtils";
import { User } from "./User.d";
import UsersData from "./prompt_ja.json";

const Users: User[] = UsersData as User[];
function sortUsers() {
  let result = Users;
  // Sort by prompt weight
  result = sortBy(result, (user) => -user.weight);
  // Sort by prompt title
  //result = sortBy(result, (user) => user.zh.title.toLowerCase());
  return result;
}

export const sortedUsers = sortUsers();
