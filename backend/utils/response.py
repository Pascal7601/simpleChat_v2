from colorama import Fore, Style, init

def error_msg(detail: str):
  print(f'{Fore.RED} {detail} {Style.RESET_ALL}')

def success_msg(detail: str):
  print(f'{Fore.GREEN} {detail} {Style.RESET_ALL}')