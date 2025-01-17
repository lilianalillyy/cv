import { DocumentIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

import { intersperse } from "../utils";
import { Config } from "../utils/types";

function getSectionTitlesCounts(sections: Config["sections"]) {
  return sections.reduce<Record<number, number>>((acc, section, index) => {
    if (section.title) {
      acc[index] = (Object.values(acc).pop() ?? 0) + 1;
    }
    return acc;
  }, {});
}

function RenderSections({ sections }: { sections: Config["sections"] }) {
  const sectionTitlesCounts = useMemo(
    () => getSectionTitlesCounts(sections),
    [sections],
  );
  return (
    <>
      {sections.map(({ title, date, content, children }, i) => (
        <div key={i} className="block" style={{ pageBreakInside: "avoid" }}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {title && (
                <h3 className="text-3xl uppercase font-medium border-b-4 tracking-widest border-black w-fit">
                  {sectionTitlesCounts[i]}. {title}
                </h3>
              )}
              <div
                className={`grid gap-10 ${!date || !content ? "grid-cols-9" : "grid-cols-12"}`}
              >
                {date && (
                  <div className="text-xl font-medium col-span-3 tracking-wider">
                    {date}
                  </div>
                )}
                {content && <div className="text-lg col-span-9">{content}</div>}
              </div>
            </div>

            {children?.length ? <RenderSections sections={children} /> : null}
          </div>
        </div>
      ))}
    </>
  );
}

export function CVTemplate({ config }: { config: Config }) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-7xl font-medium tracking-wide">
        {config.name[0]}
        <span className="ml-4 text-xl font-light italic">{config.role}</span>
        <br />
        {config.name[1]}
      </h1>
      <div className="flex items-center gap-4">
        {intersperse(
          config.contacts.map(({ icon: Icon, href, value }, i) => (
            <a key={i} className="text-sm flex items-center gap-2" href={href}>
              <Icon className="size-6" />
              <span>{value}</span>
            </a>
          )),
          <>&bull;</>,
        )}
        {config.contacts.length ? (
          <span className="print:hidden">&bull;</span>
        ) : null}
        <a
          href="cv.pdf"
          className="print:hidden text-sm flex items-center gap-2"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          <DocumentIcon className="size-6" />
          <span>PDF</span>
        </a>
      </div>

      <RenderSections sections={config.sections} />
    </div>
  );
}
