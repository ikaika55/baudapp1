import { groups, grpCards } from "../data/groups";
import { ME, users } from "../data/users";
import { A } from "../theme";

export const findUser = (id) => users.find(u => u.id === id) || { id, nm: "?" };

export const findGrpRaw = (name) => grpCards.find(g => g.name === name) || {};

export const findGrp = (name) => grpCards.find(g => g.name === name) || grpCards[0];

export const grpN = (g) => (g.members || []).length;

export const grpsOf = (userId) => grpCards.filter(g => (g.members || []).includes(userId));

export const isAdmin = (grpName, userId) => (findGrpRaw(grpName).admins || []).includes(userId);

export const myAdminGrps = () => grpCards.filter(g => (g.admins || []).includes(ME));

export const gColor = (name) => (groups.find(g => g.name === name) || {}).color || A;
