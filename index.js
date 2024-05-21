const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json()); // لدعم JSON في طلبات POST

let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

// مسار الجذر
app.get("/", (req, res) => {
  res.send("Welcome to the API. Use /api/items to get the data.");
});

// قراءة جميع العناصر
app.get("/api/items", (req, res) => {
  res.json(items);
});

// قراءة عنصر محدد بواسطة ID
app.get("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("العنصر غير موجود");
  res.json(item);
});

// إضافة عنصر جديد
app.post("/api/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// تحديث عنصر موجود
app.put("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("العنصر غير موجود");

  item.name = req.body.name;
  res.json(item);
});

// حذف عنصر
app.delete("/api/items/:id", (req, res) => {
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).send("العنصر غير موجود");

  const deletedItem = items.splice(itemIndex, 1);
  res.json(deletedItem);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
