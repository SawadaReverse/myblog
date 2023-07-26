import { Meta, StoryFn } from "@storybook/react";
import HeaderBar from "../component/header";

export default {
  title: "header",
  component: HeaderBar,
} as Meta<typeof HeaderBar>;

const Template: StoryFn<typeof HeaderBar> = () => <HeaderBar />;

export const Default: StoryFn<typeof HeaderBar> = Template.bind({});
Default.storyName = "デフォルト";
