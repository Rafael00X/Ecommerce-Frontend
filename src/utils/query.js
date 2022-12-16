import { categoryData, sectionData } from "../database";

export const getAllSections = async () => {
  sectionData.forEach(async (section) => {
    section["categories"] = await getCategoriesOfSection(section.sectionId);
  });
  return sectionData;
};

export const getCategoriesOfSection = async (sectionId) => {
  return categoryData.filter((category) => category.sectionId === sectionId);
};

export const getSection = async (sectionId) => {
  const section = sectionData.find((sec) => sec.sectionId === sectionId);
  section["categories"] = await getCategoriesOfSection(sectionId);
  return section;
};
