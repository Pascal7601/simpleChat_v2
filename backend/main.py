from database import connection
from database.conversations import Conversation
from database.messages import Message
from database.users import User
from views import services, user, message, conversation
from utils.response import error_msg, success_msg

current_user = None

while True:
  if current_user:
    prompt = f'{current_user["name"]}>'
  else:
    prompt = '>'
  print('\n=== Welcome To chatApp ===\n')
  print('l: login to your account')
  print('r: register if new to this platfrom')
  print('q: to quit')

  choice = input(f'\n{prompt} choose from the above to access this platfrom\n ').strip().lower()
  if choice == 'r':
    name = input(f'{prompt} Enter your username: ').strip()
    email = input(f'{prompt} Enter your email: ').strip()
    password = input(f'{prompt} Enter your password: ').strip()

    user.create_account(name, email, password)

  elif choice == 'l':
    email = input(f'{prompt} Enter your email: ').strip()
    password = input(f'{prompt} Enter your password: ').strip()

    logged_in_user = user.login(email, password)
    if logged_in_user:
      current_user = {'name': logged_in_user.username}
      prompt = f'{current_user["name"]}>'
      
      print("\n === Inbox ===")
      sender = User.objects().filter(username=current_user["name"]).first()

      convos = Conversation.objects().filter(participants=sender.id).all()
      if convos:
        print('\n Your messages')

        for convo in convos:
          messages = Message.objects().filter(conversation_id=convo.id)

          if messages:
            last_msg = messages.first()
            sender_name = last_msg.sender_id.username
            print(f'{sender_name}: {last_msg.content}')
      else:
        print('\n No messages yet')

      print(f'\n== chat with ==')
      print(f'available users\n')
      users = services.all_users()
      user_list = [u.username for u in users if u.username != current_user['name']]
      for idx, username in enumerate(user_list, start=1):
        print(f'{idx}: {username}')
      
      choice2 = int(input(f'{prompt} choose one user above to chat with '))
      if choice2 >= 1 and choice2 <= len(user_list):
        selected_user = user_list[choice2 - 1]

        sender = User.objects().filter(username = current_user['name']).first()
        receiver = User.objects().filter(username = selected_user).first()

        convo = conversation.new_chat([sender, receiver])
        success_msg(f'💬 now chating with {selected_user}...')

        new_message = input(f'{prompt} type a message \n').strip()
        msg = message.new_msg(sender.id, new_message, convo.id)
        success_msg(f"message sent succesfully to {selected_user}")
      else:
        error_msg("invalid selection, please choose a valid number")
        continue
        


  elif choice == "":
    continue
  elif choice == 'q':
    print('Exiting chatApp. GoodBye! ')
    break
  else:
    error_msg('kindly choose the choices provided [l, r, q]')
    



