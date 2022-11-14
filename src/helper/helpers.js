//convert image to base64
export async function convertTo64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

//arrange userData
export function ArrangeData(data) {
  let arrangedData = [];
  let obj1;
  let obj2;
  let obj3;
  for (const key1 in data) {
    obj1 = { userName: key1 };
    for (const key2 in data[key1]) {
      if (key2 === "posts") {
        let posts = [];
        for (const key02 in data[key1][key2]) {
          posts.unshift(data[key1][key2][key02].post);
        }
        obj2 = { posts: posts };
      } else if (key2 === "profile") {
        for (const key3 in data[key1][key2]) {
          obj3 = { ...obj1, ...obj2, avt: data[key1][key2][key3].avt };
        }
      }
    }
    arrangedData.push(obj3);
    obj1 = {};
    obj2 = {};
    obj3 = {};
  }

  const currentUserData = arrangedData.find((item) => {
    if (item.userName === localStorage.getItem("username")) {
      return item;
    }
  });
  return {
    arrangedData,
    currentUserData,
  };
}
export function ArrangeDetail(data) {
  let obj1;
  let obj2;

  for (const key1 in data) {
    if (key1 === "posts") {
      let post = [];
      for (const key01 in data[key1]) {
        post.unshift(data[key1][key01].post);
      }
      obj1 = { posts: post };
    } else if (key1 === "profile") {
      for (const key01 in data[key1]) {
        obj2 = { ...obj1, avt: data[key1][key01].avt };
      }
    }
  }

  return obj2;
}
