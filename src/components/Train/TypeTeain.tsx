interface ChildFinancialData {
  child_id?: number;
  income?: number;
  needs?: number;
  wants?: number;
  others?: number;
  supposed_needs_amount?: number;
  supposed_wants_amount?: number;
  supposed_others_amount?: number;
  needs_percent?: number;
  wants_percent?: number;
  others_percent?: number;
  needs_difference?: number;
  wants_difference?: number;
  others_difference?: number;
}
export default ChildFinancialData;