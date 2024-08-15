const generateUniqueId = (size = 16) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = size < 16 ? "" : Date.now().toString(36);
  while (id.length < size) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    if (id.length & 1) {
      id += char;
    } else {
      id = char + id;
    }
  }
  return id;
};

const generateUniqueId1 = (length = 16) => {
  let uniqueId = "";
  while (uniqueId.length < length) {
    uniqueId += Math.random().toString(36).slice(2);
  }
  return uniqueId.slice(0, length);
};

const generateUniqueId5 = (length) => {
  if (length < 8) {
    return Math.random().toString(36).slice(2).slice(0, length);
  }
  const timestamp = Date.now().toString(36);
  return (
    timestamp +
    Array.from(
      { length: length - timestamp.length },
      () => Math.random().toString(36)[2]
    ).join("")
  );
};

const generateUniqueId6 = ({ length = 16 } = {}) => {
  if (length < 14) {
    return Array.from(
      { length: length },
      () => Math.random().toString(36)[2]
    ).join("");
  }
  const timestamp = Date.now().toString(36);
  const randomPart = Array.from(
    { length: length - timestamp.length },
    () => Math.random().toString(36)[2]
  ).join("");
  const half = Math.floor(randomPart.length / 2);
  return randomPart.slice(0, half) + timestamp + randomPart.slice(half);
};

let map = new Map();
let i = 1;
while (true) {
  i++;
  const id = generateUniqueId6({ length: 13 });
  console.log(id);
  if (map.has(id)) {
    console.log("Existed-" + id);
    break;
  }
  map.set(id, true);
  if (i % 1000000 == 0) {
    console.log(i);
  }
}

console.log(i);
