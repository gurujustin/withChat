import styled from "styled-components";
import truncateHash from "utils/truncateHash";
import { v4 as uuidv4} from "uuid";
import orderBy from 'lodash/orderBy'
import Davatar from '@davatar/react';

const MessageList = ({ scrollRef, messages }) => {
    console.log("debug mesages", messages)
    messages = orderBy(messages, (msg) => msg.updatedAt, "asc")
    const timeFormat = (time) => {
        let result = time;
        if (time < 10) {
            result = "0" + time;
        }
        return result
    }
  return (
    <div className = "chat-messages" style={{overflowY: "auto"}}  onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
        {messages.map((message, index) => {
            const getAllMessage = () => {
                let _messageDiv = new Array();
                _messageDiv.push(message);
                let k = 1;
                while(true) {
                    if(index + k < messages.length && message.sender.username == messages[index + k].sender.username){
                        _messageDiv.push(messages[index + k])
                    k++;
                    }
                    else if(index == messages.length - 1) break;
                    else break;
                }

                return _messageDiv
            }

            if(index > 0 && message.sender.username == messages[index-1].sender.username){
                return <></>
            }
            else
            return (
                
                <div ref={scrollRef}  key={uuidv4()} >
                    <MessageContent>
                        <div className="message-header">
                            <Davatar size={20} address={message.sender.address} />
                            <p>{message.sender.username.length > 9 ? truncateHash(message.sender.username) : message.sender.username}</p>
                        </div>
                        {getAllMessage().map((_message) => {
                            return (
                                <div className="message-content">
                                    <p className="smaller-text">{timeFormat(new Date(_message.updatedAt).getHours())  + ':' + timeFormat(new Date(_message.updatedAt).getMinutes())}</p>
                                    <p className="normal-text">{_message.message}</p>
                                </div>
                            )
                        })}
                        
                    </MessageContent>
                </div>
            );
        })}
    </div>
  )
}

const MessageContent = styled.div`
    margin: 8px;
    padding: 4px;
    background: ${({ theme }) => theme.colors.backgroundDisabled};
    border-radius: 4px;

    .message-header {
        display: flex;
        align-items: center;
        padding: 8px 1px;
        p {
            padding-left: 4px;
        }
    }

    .message-content {
        display: flex;
        .smaller-text {
            font-size: 12px;
            font-weight: 400;
            padding-top: 2px;
            color: ${({ theme }) => theme.colors.textSubtle};
        }
        .normal-text {
            padding-left: 4px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            overflow: hidden;
        }
    }
`
export default MessageList
