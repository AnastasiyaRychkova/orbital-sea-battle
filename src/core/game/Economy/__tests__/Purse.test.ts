import coins from "../Coin";
import ICoin from "../CoinInterface";
import Purse from "../Purse";

describe( 'Economy: Purse', () => {
	test( 'creating', () => {
		expect( new Purse().balance ).toBe( 0 );
	} );

	test( 'adding coins in purse', () => {
		const X = 5;
		const purse = new Purse();
		purse.add( coins( X ) );
		expect( purse.balance ).toBe( X );
	} );

	test( 'withdrawal of money from the account', () => {
		const purse = new Purse( 10 );
		const money: ICoin = purse.takeOut( 2 );
		expect( money.value ).toBe( 2 );
		expect( purse.balance ).toBe( 8 );
	} );

	test( 'check money', () => {
		const purse = new Purse( 10 );
		expect( purse.has( 10 ) ).toBeTruthy();
		expect( purse.has( 10.2 ) ).toBeFalsy();
		expect( purse.has( 11 ) ).toBeFalsy();
		expect( purse.has( -1 ) ).toBeTruthy();
		expect( purse.has( coins( 10 ) ) ).toBeTruthy();
	} )
});