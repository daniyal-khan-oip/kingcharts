import Link from "next/link";
import Accordion from "./Accordion";

export default function FAQ(props) {
  return (
    <div className="container mx-auto xl:px-20 px-5 pt-10 pb-20">
      <div className="mt-48 w-full">
        <div className="text-center">
          <h2 className="text-5xl font-bold">Frequently Asked Questions</h2>
          <p className="my-5">
            Haven't got your answer?{" "}
            <Link href="/contact">
              <a className="font-bold">Contact our support now</a>
            </Link>
          </p>
        </div>

        <div className="flex w-full flex-wrap  items-stretch">
          {props?.faqs?.data?.map((element) => (
            <div
              className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 block gap-5 py-5"
              key={element.id}
            >
              <Accordion title={element.attributes.Question}>
                {element.attributes.Answer}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
