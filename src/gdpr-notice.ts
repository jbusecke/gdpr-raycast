import { closeMainWindow, getPreferenceValues, showHUD, showToast, Toast } from "@raycast/api";
import { runAppleScript } from "@raycast/utils";
import { SUBJECT, buildBody, firstName } from "./notice";

const READ_SELECTED_MESSAGE = `
on run argv
  tell application "Mail"
    set _sel to selection
    if (count of _sel) is 0 then return "ERR::no-selection"
    set _msg to item 1 of _sel
    set _senderName to extract name from (sender of _msg)
    set _senderAddress to extract address from (sender of _msg)
    try
      set _replyTo to reply to of _msg
      if _replyTo is not missing value and _replyTo is not "" then set _senderAddress to extract address from _replyTo
    end try
    set _toAddress to ""
    try
      set _toAddress to address of to recipient 1 of _msg
    end try
    if item 1 of argv is "junk" then
      set junk mail status of _msg to true
      try
        move _msg to junk mailbox
      end try
    end if
    return _senderName & linefeed & _senderAddress & linefeed & _toAddress
  end tell
end run
`;

const CREATE_DRAFT = `
on run argv
  tell application "Mail"
    set _draft to make new outgoing message with properties {subject:item 2 of argv, content:item 3 of argv, visible:true}
    tell _draft to make new to recipient at end of to recipients with properties {address:item 1 of argv}
    activate
  end tell
end run
`;

interface Preferences {
  yourName: string;
  moveToJunk: boolean;
}

export default async function Command() {
  const { yourName, moveToJunk } = getPreferenceValues<Preferences>();
  await closeMainWindow();

  let result: string;
  try {
    result = await runAppleScript(READ_SELECTED_MESSAGE, [moveToJunk ? "junk" : "keep"]);
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Could not read Mail",
      message: error instanceof Error ? error.message : String(error),
    });
    return;
  }

  if (result.trim() === "ERR::no-selection") {
    await showToast({ style: Toast.Style.Failure, title: "No message selected in Mail" });
    return;
  }

  const [senderName = "", senderAddress = "", toAddress = ""] = result.split("\n").map((line) => line.trim());
  if (senderAddress === "") {
    await showToast({ style: Toast.Style.Failure, title: "Could not read the sender address" });
    return;
  }

  const body = buildBody({
    addressee: firstName(senderName, senderAddress),
    email: toAddress !== "" ? toAddress : senderAddress,
    yourName,
  });

  await runAppleScript(CREATE_DRAFT, [senderAddress, SUBJECT, body]);
  await showHUD(moveToJunk ? "GDPR notice draft opened, message moved to Junk" : "GDPR notice draft opened in Mail");
}
