import { Button } from '@/shared/ui/Button';

interface Props {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

export const AddButton = ({ onClick, disabled, isLoading }: Props) => {
  return (
    <div className="w-full mt-5">
      <Button
        type="submit"
        variant="primary"
        size="xl"
        fullWidth
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        추가하기
      </Button>
    </div>
  );
};
