import { computeSummary } from "../../data/store";

export class SummaryService {
  getSummary() {
    return computeSummary();
  }
}
