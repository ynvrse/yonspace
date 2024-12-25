import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,AlertDialogFooter, AlertDialogContent,AlertDialogCancle, AlertDialogDescription, AlertDialogAction, AlertDialogFooter } from "./ui/alert-dialog";

export default function ActionDialog({trigger, action, title, description}){
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancle>
                        Cancel
                    </AlertDialogCancle>
                    <AlertDialogAction  onClick={action}>
                    Continue
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    )
}