import { Button } from '@/components/ui/button';

const MisioneroAñadirForm = () => {
  return (
    <div className="pt-6 space-x-6 flex items-center justify-end w-full">
      <Button variant="destructive">Cancel</Button>
      <Button variant="outline">Continue</Button>
    </div>
  );
};

export default MisioneroAñadirForm;


