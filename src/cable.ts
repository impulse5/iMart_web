// @ts-ignore
import { createConsumer } from "@rails/actioncable";

const cable = createConsumer("https://1eea-2804-29b8-504e-a00-cd63-b72-17d7-d255.ngrok-free.app/cable");

export default cable;