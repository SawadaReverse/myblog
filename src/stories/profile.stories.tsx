import { Meta, StoryFn } from "@storybook/react";
import Profile from "../component/profile";

export default {
  titye: "profile",
  component: Profile,
} as Meta<typeof Profile>;

const Template: StoryFn<typeof Profile> = () => <Profile />;

export const Default: StoryFn<typeof Profile> = Template.bind({});
Default.storyName = "デフォルト";
