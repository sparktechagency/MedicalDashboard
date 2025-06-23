const decodeHtmlEntities = (str) => {
    console.log(str);
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.documentElement.textContent || doc.documentElement.innerText;
  };
  export default decodeHtmlEntities;