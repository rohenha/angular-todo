import { defineHandler } from "nitro";
import { getMongoDb } from "~/server/utils/mongo";

export default defineHandler((event) => {
  return [
    { id: '1', title: 'Apprendre Nitro', completed: true },
  ]
});
