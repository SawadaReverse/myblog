import { Tag } from '@/app/api/types/types';
import { Tag as TagIcon } from '@mui/icons-material';
import { Chip } from '@mui/material';

type Props = {
  tags: Tag[];
};

export default async function TagArray(props: Props) {
  return (
    <>
      {props.tags.map((tag) => (
        <Chip
          component="a"
          icon={<TagIcon />}
          label={`${tag.name}`}
          href={`/tag/${tag.id}`}
          key={tag.id}
          sx={{ mr: 2, my: 1 }}
          clickable
        />
      ))}
    </>
  );
}
