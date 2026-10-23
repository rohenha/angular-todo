import { defineHandler } from "nitro";

export default defineHandler((event) => {
  return [
    { id: '1', title: 'Apprendre Nitro', completed: true },
  ]
});
