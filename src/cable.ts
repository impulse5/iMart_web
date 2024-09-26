// @ts-ignore
import { createConsumer } from "@rails/actioncable";

const cable = createConsumer("https://91de-200-129-62-72.ngrok-free.app/cable");

export default cable;