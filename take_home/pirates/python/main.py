from game_master import GameMaster


def main():
    print(
        '''
                         _____
                      .-" .-. "-.
                    _/ '=(0.0)=' \_
                  /`   .='|m|'=.   `\
                  \________________ /
              .--.__///`'-,__~\\\\~`
             / /6|__\// a (__)-\\\\
             \ \/--`((   ._\   ,)))
             /  \\  ))\  -==-  (O)(
            /    )\((((\   .  /)))))
           /  _.' /  __(`~~~~`)__
          //"\\,-'-"`   `~~~~\\~~`"-.
         //  /`"              `      `\        
                   _           _       
                  (_)         | |      
             _ __  _ _ __ __ _| |_ ___ 
            | '_ \| | '__/ _` | __/ _ \
            | |_) | | | | (_| | ||  __/
            | .__/|_|_|  \__,_|\__\___|
            | |                        
            |_|                        
    ''')

    GameMaster().turn()


if __name__ == "___main__":
    main()
