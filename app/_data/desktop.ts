type ButtonType = {
  id: number;
  text: string;
};

type OptionType = {
  buttonId: number;
  id: number;
  text: string;
};

export type DataType = {
  button1: OptionType[];
  button2: OptionType[];
  button3: OptionType[];
  button4: OptionType[];
};

export const buttons: ButtonType[] = [
  {
    id: 1,
    text: "予約と金額",
  },
  {
    id: 2,
    text: "効果",
  },
  {
    id: 3,
    text: "注意点",
  },
  {
    id: 4,
    text: "接種後",
  },
];

export const options: DataType = {
  button1: [
    {
      buttonId: 1,
      id: 1,
      text: "金額はいくらですか？",
    },
    {
      buttonId: 1,
      id: 2,
      text: "予約の方法は？",
    },
    {
      buttonId: 1,
      id: 3,
      text: "予約の方法は？",
    },
    {
      buttonId: 1,
      id: 4,
      text: "ウェブ問診とはなんですか?",
    },
    {
      buttonId: 1,
      id: 5,
      text: "その他",
    },
  ],
  button2: [
    {
      buttonId: 2,
      id: 1,
      text: "金額はいくらですか？",
    },
    {
      buttonId: 2,
      id: 2,
      text: "予約の方法は？",
    },
    {
      buttonId: 2,
      id: 3,
      text: "予約の方法は？",
    },
    {
      buttonId: 2,
      id: 4,
      text: "ウェブ問診とはなんですか?",
    },
    {
      buttonId: 2,
      id: 5,
      text: "その他",
    },
  ],
  button3: [
    {
      buttonId: 3,
      id: 1,
      text: "金額はいくらですか？",
    },
    {
      buttonId: 3,
      id: 2,
      text: "予約の方法は？",
    },
    {
      buttonId: 3,
      id: 3,
      text: "予約の方法は？",
    },
    {
      buttonId: 3,
      id: 4,
      text: "ウェブ問診とはなんですか?",
    },
    {
      buttonId: 3,
      id: 5,
      text: "その他",
    },
  ],
  button4: [
    {
      buttonId: 4,
      id: 1,
      text: "金額はいくらですか？",
    },
    {
      buttonId: 4,
      id: 2,
      text: "予約の方法は？",
    },
    {
      buttonId: 4,
      id: 3,
      text: "予約の方法は？",
    },
    {
      buttonId: 4,
      id: 4,
      text: "ウェブ問診とはなんですか?",
    },
    {
      buttonId: 4,
      id: 5,
      text: "その他",
    },
  ],
};
