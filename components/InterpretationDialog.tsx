import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function InterpretationDialog({ isOpen, onOpenChange, content, title }) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="default">Interpretation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div
                    className="grid gap-4 py-4"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
                <div className="flex justify-end">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default InterpretationDialog;
