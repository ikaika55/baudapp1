import { groups, grpCards } from "../data/groups";
import { ME, users } from "../data/users";
import { A } from "../theme";

export const findUser = (id) => users.find(u => u.id === id) || { id, nm: "?" };

export const findGrpRaw = (name) => grpCards.find(g => g.name === name) || {};

export const findGrp = (name) => grpCards.find(g => g.name === name) || grpCards[0];

export const rosterOf = (mem, name) => (mem && mem[name]) || (grpCards.find(x => x.name === name) || {}).members || [];

export const grpN = (g, mem) => rosterOf(mem, g.name).length;

export const grpsOf = (userId, mem) => grpCards.filter(g => rosterOf(mem, g.name).includes(userId));

export const isAdmin = (grpName, userId) => (findGrpRaw(grpName).admins || []).includes(userId);

export const myAdminGrps = () => grpCards.filter(g => (g.admins || []).includes(ME));

export const gColor = (name) => (groups.find(g => g.name === name) || {}).color || A;
