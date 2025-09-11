
const sections = [
  {
    // title: "Why Purely?",
    text: `Purely is more than a brand — it’s your partner in self-care. We combine expert knowledge with real-life solutions to bring you the best in skincare and haircare. Every product is backed by science and thoughtfully crafted to meet your unique needs. And with Mira, our expert guide by your side, you're never navigating this journey alone. She’s here to answer your questions and support you every step of the way.

Step into a world where your skin and hair are celebrated — where self-care is simple, effective, and empowering.`,
  },
  {
    title: "Why Purely Cares About Your Skin & Hair",
    text: `Purely knows that your skin and hair are more than skin-deep — they are your body’s natural armor against stress, pollution, and environmental damage. But even the strongest defenses need extra care. That’s why we’re here! At Purely, we believe that self-care isn’t a luxury; it’s a way to feel confident, healthy, and radiant every day.`,
  },
  // {
  //   title: "Why Purely Thinks Skincare & Haircare Aren’t Just Trends",
  //   text: `At Purely, we understand that you might wonder if all those creams, serums, and oils are just hype. Here’s what we’ve learned:`,
  //   list: [
  //     {
  //       highlight: "Smart Choices Save You Money:",
  //       text: "Using products suited to your skin and hair means you need fewer of them — and you avoid wasting money on what's not right for you.",
  //     },
  //     {
  //       highlight: "One Size Doesn’t Fit All:",
  //       text: "What works for your friend may not work for you. Understanding your unique needs helps you focus only on what truly makes a difference.",
  //     },
  //     {
  //       highlight: "Care Now, Save Later:",
  //       text: "A good routine today helps prevent future problems — saving you from costly treatments down the road.",
  //     },
  //   ],
  // },
  {
    title: "Purely’s Approach to Self-Care",
    text: "Purely believes that beauty starts from within. Here’s how proper care supports your skin and hair’s health on a deeper level:",
    list: [
      {
        highlight: "Strengthen Your Natural Barrier:",
        text: "Healthy skin and hair are better equipped to fight dryness, irritation, and environmental stress.",
      },
      {
        highlight: "Support Regeneration:",
        text: "The right care helps boost cell turnover, keeping your complexion fresh and your hair nourished.",
      },
      {
        highlight: "Balance Matters:",
        text: "Maintaining proper pH and moisture levels prevents issues like breakouts or hair thinning.",
      },
      {
        highlight: "Confidence Comes Naturally:",
        text: "When you look and feel good, that glow radiates from within — boosting your confidence every day.",
      },
    ],
  },
  {
    title: "We Encourages You to Invest in Yourself",
    text: "Purely believes that caring for your skin and hair is a form of self-love. With the right approach, you can:",
    list: [
      { highlight: "Prevent problems before they start,", text: "like dryness, acne, or hair fall." },
      { highlight: "Heal and restore your skin or hair,", text: "with targeted solutions that work." },
      { highlight: "Age gracefully,", text: "keeping your glow longer." },
      {
        highlight: "Feel naturally beautiful,",
        text: "reducing the need for heavy makeup or styling products.",
      },
    ],
  },
  {
    title: "Getting Started Easy",
    button: { label: "Discover Your Routine", link: "/" },
    text: "Purely knows that beginning your skincare and haircare journey can feel overwhelming. Here’s what you should keep in mind:",
    list: [
      {
        highlight: "It’s okay to experiment:",
        text: "Find what works for you through trial and learning — every journey is unique!",
      },
      {
        highlight: "Results take time:",
        text: "Consistency is key — give products a few weeks to show real improvements.",
      },
      {
        highlight: "Ask for help:",
        text: "No question is too small — Mira and the Purely team are here to guide you with care and compassion.",
      },
    ],
  },
];




type SectionProps = {
  title: React.ReactNode;
  text?: string;
  list?: { highlight: string; text: string }[];
  button?: { label: string; link: string };
};

const Section = ({ title, text, list }: SectionProps) => {
  return (
    <div className="mb-[4rem] mt-0">
      {title && (
        <h1>{title}</h1>
      )}
      {text && (
        <p className="font-Quicks text-white mt-[1rem] whitespace-pre-line">
          {text}
        </p>
      )}

      {list && (
        <ul className="mt-[1rem] font-Quicks list-none text-white">
          {list.map((item, i) => (
            <li key={i}>
              🖤
              <span className="font-semibold italic">&nbsp;{item.highlight}&nbsp;</span>
              {item.text}
            </li>
          ))}
        </ul>
      )}

      {/* {button && (
        <div className="mt-[2.5rem]">
          <a
            href={button.link}
            className="block text-[0.8rem] ss:text-[1rem] font-semibold bg-foreground text-white py-[1rem] px-[2rem] rounded-full md:w-[40%] lg:w-fit"
          >
            {button.label}
          </a>
        </div>
      )} */}
    </div>
  );
};

const About = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full min-h-[96vh]">
        {sections.map((section, index) => (
          <Section key={index} {...section} />
        ))}
      </div>
    </div>
  );
};

export default About;
