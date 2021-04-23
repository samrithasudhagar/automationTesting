const assert = require('assert')
const LOGIN_USER_EMAIL='.inputField'
const PWD_FIELD='.inputField[type=password]'
const SUBMIT_BTN='.btn'
const SUBMIT_BTN2='.btn-spinner .btn'
const recipe='.cardTitle'
const planit='.actionmodalList li svg'
const addbtn='.modalFooter .btn'
const grocerylist='.actionmodalList li:nth-of-type(2) svg'
const yesbtn='.groceriesFooter .btn'
const addnote='.actionmodalList li:nth-of-type(3) svg'
const notetype='.modalInput'
const favbtn='.actionmodalList li:nth-of-type(4) svg'
const optn='span svg'
const comment='.commentInput'
const workouts='.main-menu1 li'
describe('login page', () => {
    it('should have the right title', () => {
        browser.url('https://dd-dev.tmls.dev/login')
    })
    it('email-id is typeable', () => {
        let email_field = $(LOGIN_USER_EMAIL)
        email_field.addValue('chinnaiyanswathi@gmail.com' )
       
      })
      it('password is typeable', () => {
        let pwd_field = $(PWD_FIELD)
        pwd_field.addValue('16jecs247')
       
      })
      it('submit is clickable', () => {
        $(SUBMIT_BTN).waitForEnabled(3000)
        const myButton = $(SUBMIT_BTN)
        myButton.click()
    })
   it('recipe is clickable', () => {
        const myButton = $(recipe)
        myButton.click()
  })
 it('show full nutrition is clickable', () => {
        const myButton = $('h6 svg')
        myButton.click()
        $('.showFullNutrition').waitForExist(3000)
  
    }) 
    it('hide full nutrition is clickable', () => {
        const myButton = $('h6 svg')
        myButton.click()
  
    }) 

  it('plan-it is clickable', () => {
        $(planit).waitForExist(3000)
        const myButton = $(planit)
        myButton.click()
  
    }) 
    it('option is clickable', () => {
        $('.modalBody').waitForExist(3000)
        const myButton = $('body > div:nth-child(7) > div > div > div.modalWrapper.add-meal-from-index-wrapper > div.modalBody.mealplan-index-body > div:nth-child(3) > div > div > div > span > label.input-label.checkboxFieldLabel > span > svg')
        myButton.click()
       })
       it('arrow is clickable', () => {
        const myButton = $('.title > figure > svg')
        myButton.click()
        $('.calendarLists').waitForExist(3000)
       })
       it('option is clickable', () => {
        const myButton = $('.title p')
        myButton.click()
      
       })
       
    it('arrow is unclickable', () => {
        const myButton =$('.title > figure > svg')
        myButton.click()
       })
    it('btn is clickable', () => {
       
        const myButton = $(addbtn)
        myButton.click()
        $('.Toastify__toast-body').waitForExist(3000)
    })
    it('grocery list is clickable', () => {
        const myButton = $(grocerylist)
        myButton.click()
        $('.Addgroceries').waitForExist(3000)
    
    })  
    it('slowdown page', () => {
        browser.executeAsync((done) => {
            setTimeout(done, 2000);
        });
    });
    
    it('yesbtn is clickable', () => {
        $('.Addgroceries').waitForExist(3000)
        const myButton = $(yesbtn)
        myButton.click()
        $('.Toastify__toast-body').waitForExist(3000)
    })
    it('addnote is clickable', () => {
        const myButton = $(addnote)
        myButton.click()
        $('.modalBody').waitForExist(3000)
    })
    it('slowdown page', () => {
        browser.executeAsync((done) => {
            setTimeout(done, 2000);
        });
    });
    it('note is typeable', () => {
        let note = $(notetype)
        note.addValue('hello!')
       })
    
      it('btn is clickable', () => {
        $(addbtn).waitForEnabled(3000)
        const myButton = $(addbtn)
        myButton.click()
        
    })
    it('servings is clickable', () => {
        const myButton = $('.dropdownBlock .customSelect')
        myButton.click()
    })
    it('btn is clickable', () => {
        const myButton = $('.customSelect option')
        myButton.click()
     })
    it('ingredients are addable', () => {
        const myButton = $('span svg')
        myButton.click()
    })
 
    it('btn is clickable', () => {
        const myButton = $('.btn')
        myButton.click()
     })
     it('slowdown page', () => {
        browser.executeAsync((done) => {
            setTimeout(done, 7000);
        });
    });
    it('comment is typeable', () => {
        let cmnt_field = $(comment)
        cmnt_field.addValue('nice recipe')
     })
     it('slowdown page', () => {
        browser.executeAsync((done) => {
            setTimeout(done, 7000);
        });
    });
    it('submit is clickable', () => {
        const myButton = $(SUBMIT_BTN)
        myButton.click()
    })
    it('slowdown page', () => {
        browser.executeAsync((done) => {
            setTimeout(done, 7000);
        });
    });
    it('fav btn  is clickable', () => {
        const myButton = $(favbtn)
    myButton.click()
}) 
    it('add new category is typeable', () => {
        if($('.categoryInput').isExisting())
        {
        let new_category = $('.categoryInput')
        new_category.addValue('brunch')
        }
      })
      it('slowdown page', () => {
        browser.executeAsync((done) => {
            setTimeout(done, 7000);
        });
    });
    it('btn is clickable', () => {
        if($(addbtn).isExisting())
        {
            const myButton = $(addbtn)
            myButton.click()
            $('.Toastify__toast-body').waitForExist(3000)
        }
        })
    
        it('share recipes is clickable', () => {
            const myButton = $('.react-sharing-button__text')
            myButton.click()
         })
    it('slowdown page', () => {
        browser.executeAsync((done) => {
            setTimeout(done, 7000);
        });
    });
})
describe('cancel flow', () => {
    it('should have the right title', () => {
        browser.url('https://dd-dev.tmls.dev/login')
    })
    it('email-id is typeable', () => {
        let email_field = $(LOGIN_USER_EMAIL)
        email_field.addValue('chinnaiyanswathi@gmail.com' )
       
      })
      it('password is typeable', () => {
        let pwd_field = $(PWD_FIELD)
        pwd_field.addValue('16jecs247')
       
      })
      it('submit is clickable', () => {
        $(SUBMIT_BTN).waitForEnabled(3000)
        const myButton = $(SUBMIT_BTN)
        myButton.click()
    })
   it('recipe is clickable', () => {
        const myButton = $(recipe)
        myButton.click()
  })
  it('plan-it is clickable', () => {
    $(planit).waitForExist(3000)
    const myButton = $(planit)
    myButton.click()

}) 
it('slowdown page', () => {
    browser.executeAsync((done) => {
        setTimeout(done, 7000);
    });
});
it('btn is clickable', () => {
    $('.modalBody').waitForExist(3000) 
    const myButton = $('.btn:nth-of-type(2)')
    myButton.click()
    
})
it('grocery list is clickable', () => {
    const myButton = $(grocerylist)
    myButton.click()
    $('.Addgroceries').waitForExist(3000)

})  
it('btn is clickable', () => {
 const myButton = $('.btn:nth-of-type(2)')
    myButton.click()
    
})
it('addnote is clickable', () => {
    const myButton = $(addnote)
    myButton.click()
    $('.modalBody').waitForExist(3000)
})
it('slowdown page', () => {
    browser.executeAsync((done) => {
        setTimeout(done, 7000);
    });
});
it('btn is clickable', () => {
       
    const myButton = $('.btn:nth-of-type(2)')
    myButton.click()
    
})
it('fav btn  is clickable', () => {
    const myButton = $(favbtn)
myButton.click()
}) 
it('option is clickable', () => {
    $('.modalBody').waitForExist(3000)
    const myButton = $(optn)
    myButton.click()
   })
it('btn is clickable', () => {
    if($('.btn:nth-of-type(2)').isExisting())
    {
        const myButton = $('.btn:nth-of-type(2)')
        myButton.click()

    }
    })
    it('slowdown page', () => {
        browser.executeAsync((done) => {
            setTimeout(done, 7000);
        });
    });
})