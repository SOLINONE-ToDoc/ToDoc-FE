import { Button } from '@/shared/ui/Button';

interface Props {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

export const SignUpButton = ({ onClick, disabled, isLoading }: Props) => {
  return (
    <div className="w-full mt-auto pb-10 lg:pb-20">
      <Button
        type="submit"
        variant="primary"
        size="xl"
        fullWidth
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        가입하기
      </Button>
    </div>
  );
};
