import { Request, Response } from "express";
import express from "express";
const router = express.Router();

router.get("/:stopId", async (req: Request, res: Response) => {
  res.status(400).json("hi");
//   try {
//     const post = await Data.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ Error: "Post not found!" });
//     }
//     res.status(200).json(post);
//   } catch (error) {
//     res.status(500).json({ Error: error });
//   }
});

module.exports = router;
