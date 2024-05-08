import { v2 as cloudinary } from "cloudinary";

const fetchFromCloudinary = async (tag) => {
  if (tag === "icon") {
    const result = await cloudinary.api.resources_by_tag(tag);
    const backgroundIcons = result.resources.map((icon) => {
      const iconName = icon.public_id.split("/").pop();
      const iconUrl = icon.secure_url;
      return { [iconName]: iconUrl };
    });
    return { images: backgroundIcons };
  }

  if (tag === "none-background") {
    return {};
  }

  if (tag !== "none-background") {
    try {
      const result = await cloudinary.api.resources_by_tag(tag);
      const sortedImg = result.resources.sort((a, b) => a.width - b.width);
      const setOfImages = {
        mobile_1x: sortedImg[0].secure_url,
        mobile_2x: sortedImg[1].secure_url,
        tablet_1x: sortedImg[2].secure_url,
        tablet_2x: sortedImg[4].secure_url,
        desktop_1x: sortedImg[3].secure_url,
        desktop_2x: sortedImg[5].secure_url,
      };
      return setOfImages;
    } catch (error) {
      console.error(error);
    }
  }
};

export default fetchFromCloudinary;
