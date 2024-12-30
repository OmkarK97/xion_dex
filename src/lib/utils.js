import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const lp_address = "xion1xk752hg0z4hydjq3vsj0q9ra338cewhhnm040ssxsp7xdt5zdhtq0vfxkj";
export const token_weth = "xion1dzjrpqgvgdjldrcycg6vmrsfduzj60tphwzvjy8m477lexxd7jgssuf9vh";

export const parseMantra = (value) => {
  let number = parseFloat(value);
  let scaledNumber = Math.round(number * 1e6);
  return parseInt(scaledNumber);
};