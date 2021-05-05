const GameMaster =  require('./gameMaster')
const welcomeMessage = `
                         _____
                      .-" .-. "-.
                    _/ '=(0.0)=' \\_
                  /    .='|m|'=.    \\
                  \\________________ /
              .--.__/// '-,__~\\\\\\\\~
             / /6|__\\// a (__)-\\\\\\\\
             \\ \\/-- ((   ._\\   ,)))
             /  \\\\  ))\\  -==-  (O)(
            /    )\\((((\\   .  /)))))
           /  _.' /  __('~~~~')__
          //"\\\\,-'-"'   '~~~~\\\\~~'"-.
         //  /'"              '      '\\
                   _           _
                  (_)         | |
             _ __  _ _ __ __ _| |_ ___
            | '_ \\| | '__/ _' | __/ _ \\
            | |_) | | | | (_| | ||  __/
            | .__/|_|_|  \\__,_|\\__\\___|
            | |
            |_|
    `;
function main() {
    const gameMaster = new GameMaster()
    console.log(welcomeMessage);
    //NOTE: awkward function names can be confusing 
    gameMaster.turn()

}
main()
