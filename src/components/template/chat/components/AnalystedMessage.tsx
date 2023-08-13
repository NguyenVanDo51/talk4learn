import { Collapse, Drawer, Spin, message } from "antd";
import { FC, useEffect, useState } from "react";
import { IAnalystMessage } from "..";
import { AppButton } from "@/components/level1/antd/AppButton";
import { useDimention } from "@/hooks/helpers/useDimention";
import { IMessage } from "@/types/chat";
import { ScrollSelecter, scrollToBottom } from "@/helpers/dom";

interface IProps {
  isGettingComment: boolean;
  isShowAnalyst: boolean;
  analystedMessages: IAnalystMessage[];
  setAnalystMessages: (analystedMessages: IAnalystMessage[]) => void;
  setIsShowComment: (isShowAnalyst: boolean) => void;
  handleAnalyst: (m: IMessage) => void;
}

export const AnalyistedMessage: FC<IProps> = ({
  isGettingComment,
  isShowAnalyst,
  analystedMessages,
  setIsShowComment,
  handleAnalyst,
  setAnalystMessages,
}) => {
  const [activeKey, setActiveKey] = useState<string[]>([]);
  const { isDesktop } = useDimention();

  const deleteAnalystMessage = (messageId: IMessage["id"]) => {
    setAnalystMessages(analystedMessages.filter((m) => m.id !== messageId));
  };

  const messagesPasred = analystedMessages.map((m, index) => ({
    key: `${index}_${m.id}`,
    label: (
      <div className="flex justify-between gap-2">
        <span>{m.content}</span>
        <div className="flex gap-2">
          {m.status === "error" && (
            <AppButton
              size="small"
              danger
              type="text"
              className=""
              onClick={
                m.id !== analystedMessages.at(-1)?.id
                  ? undefined
                  : (e) => {
                      e.stopPropagation();
                      handleAnalyst(m);
                    }
              }
              icon={
                m.id !== analystedMessages.at(-1)?.id ? (
                  <i className="fa-regular fa-exclamation"></i>
                ) : (
                  <i className="fa-regular fa-rotate-right"></i>
                )
              }
            ></AppButton>
          )}
          {m.status === "sent" ? (
            <Spin spinning />
          ) : (
            <AppButton
              size="small"
              danger
              type="text"
              className=""
              onClick={(e) => {
                e.stopPropagation();
                deleteAnalystMessage(m.id);
              }}
              icon={<i className="fa-regular fa-trash"></i>}
            ></AppButton>
          )}
        </div>
      </div>
    ),
    children: <>{m.status === "error" ? "Analyst error" : m.comment}</>,
    type: "divider",
  }));

  useEffect(() => {
    scrollToBottom(ScrollSelecter.AnalystMessage);
    if (isGettingComment) return;
    const newestMessage = analystedMessages.at(-1);
    console.log('newestMessage', newestMessage)
    if (newestMessage?.comment) {
      setActiveKey([newestMessage.id] as any);
    }
  }, [isGettingComment, analystedMessages]);

  const renderContent = () => (
    <div
      id="analyst"
      className="overflow-y-auto pb-[10rem]"
      style={{
        maxHeight: "calc(100vh - 74px)",
      }}
    >
      <div className="p-2 lg:p-3">
        {analystedMessages.length > 0 ? (
          <Collapse
            size="small"
            items={messagesPasred}
            className="h-fit no-top-border-collapse "
            activeKey={activeKey}
            onChange={(key) => {
              setActiveKey(key as string[]);
            }}
          ></Collapse>
        ) : (
          <div className="text-gray-500">Empty</div>
        )}
      </div>
    </div>
  );

  const deleteAllAnalystMessages = () => {
    setAnalystMessages([]);
  };

  const renderDeteteAll = () => {
    return (
      <AppButton
        size="small"
        danger
        type="text"
        className=""
        onClick={(e) => {
          e.stopPropagation();
          deleteAllAnalystMessages();
        }}
        icon={<i className="fa-regular fa-trash"></i>}
      >
        Clear
      </AppButton>
    );
  };

  const title = (
    <div className="font-bold lg:px-3 flex justify-between items-center h-[54px] lg:dark:bg-dark-active-main-bg">
      <span>Grammar check</span> {renderDeteteAll()}
    </div>
  );

  if (isDesktop && isShowAnalyst) {
    return (
      <div className="col-start-8 col-end-13 border-l dark:border-dark-line">
        <div className="grid w-full">
          {title}
          {renderContent()}
        </div>
      </div>
    );
  }

  return (
    <Drawer
      placement="right"
      open={isShowAnalyst}
      onClose={() => setIsShowComment(false)}
      headerStyle={{ height: 56 }}
      closeIcon={<i className="fa-solid fa-xmark text-xl text-white"></i>}
      title={title}
    >
      {renderContent()}
    </Drawer>
  );
};
