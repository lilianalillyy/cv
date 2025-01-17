export function intersperse<T, R>(elements: T[], separator: R): Array<T | R> {
  return elements.flatMap((el, i) =>
    i < elements.length - 1 ? [el, separator] : [el],
  );
}

export const c = (...strings: (string | false | undefined | false | null)[]) =>
  strings.filter((s) => !!s).join(" ");
