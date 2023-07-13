import { sortBy } from "@site/src/utils/jsUtils";
import { User } from './User.d';
import UsersData from "./prompt_fr.json";

const Users: User[] = UsersData as User[];
function sortUsers() {
  let result = Users;
  // Sort by prompt weight
  result = sortBy(result, (user) => -user.weight);
  // Sort by prompt title
  //result = sortBy(result, (user) => user.zh.title.toLowerCase());
  // Sort by favorite tag, favorites first
  result = sortBy(result, (user) => !user.tags.includes("favorite"));
  return result;
}

export const sortedUsers = sortUsers();
