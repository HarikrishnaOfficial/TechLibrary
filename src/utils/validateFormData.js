export const validateFormData = (formData) => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = "Title is required.";
    if (!formData.url) tempErrors.url = "URL is required.";
    if (!/^https?:\/\/.+\..+/.test(formData.url)) tempErrors.url = "URL is not valid.";
    if (!formData.author) tempErrors.author = "Author is required.";
    if (!formData.num_comments) tempErrors.num_comments = "Number of comments is required.";
    if (isNaN(formData.num_comments)) tempErrors.num_comments = "Number of comments must be a number.";
    if (!formData.points) tempErrors.points = "Points are required.";
    if (isNaN(formData.points)) tempErrors.points = "Points must be a number.";
    return tempErrors;
};
