from database.conversations import Conversation

def new_chat(participants: list) -> Conversation:
  existing_convo = Conversation.objects.filter(
        participants__all=participants, participants__size=len(participants)
    ).first()
  if existing_convo:
    return existing_convo
  
  convo = Conversation(participants=participants)
  convo.save()
  return convo