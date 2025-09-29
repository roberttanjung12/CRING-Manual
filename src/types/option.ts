interface Option<TValue = string, TText = string> {
  value: TValue;
  text: TText;
}

interface OptionTypeLabel<TValue = string, TLabel = string> {
  value: TValue;
  label: TLabel;
}

interface OptionPeriod<TStart = Date, TEnd = Date> {
  start: TStart;
  end: TEnd;
}

export type { Option, OptionTypeLabel, OptionPeriod };
