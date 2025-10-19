import { TeamMember } from "./team.types";

export const sortMembers = (list: TeamMember[]) =>
  list.slice().sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.name.localeCompare(b.name));

export const filterMembers = (
  list: TeamMember[],
  dept?: string,
  query?: string
) => {
  let res = list;
  if (dept && dept !== "All") res = res.filter((m) => m.dept === dept);
  if (query?.trim()) {
    const q = query.toLowerCase();
    res = res.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.dept.toLowerCase().includes(q)
    );
  }
  return sortMembers(res);
};

/** pick featured (first Executive by order) */
export const featuredMember = (list: TeamMember[]) =>
  sortMembers(list.filter((m) => m.dept === "Executive"))[0] ?? null;
