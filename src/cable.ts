// @ts-ignore
import { createConsumer } from "@rails/actioncable";
import { API_BASE_URL } from "./constants/api_routes";

const cable = createConsumer(`${API_BASE_URL}/dashboard`);

export default cable;