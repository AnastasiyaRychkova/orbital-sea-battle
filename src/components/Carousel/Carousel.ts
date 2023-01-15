import { action, computed, makeObservable, observable } from 'mobx';
import type { TouchEvent } from 'react';
import type { Abscissa, Index, URL } from 'types/primitive';

export type CarouselImage<T> = {
	title: string;
	src: URL;
	meta?: T;
};


class Carousel {
	private _slides: CarouselImage<unknown>[];
	private _currentSlide: Index;
	private _touchPosition: Abscissa | null;

	private THRESHOLD = 10;

	constructor( steps: CarouselImage<unknown>[] ) {
		makeObservable<
			Carousel,
			'_currentSlide' |
			'_touchPosition'
		>( this, {
			_currentSlide: observable,
			_touchPosition: observable,

			currentIndex: computed,
			currentSlide: computed,
			size: computed,

			right: action,
			left: action,
			toSlide: action,
			setTouchPosition: action,
		} );

		this._slides = steps;
		this._currentSlide = 0;
		this._touchPosition = null;
	}

	get slides(): CarouselImage<unknown>[] {
		return this._slides;
	}

	get currentIndex(): Index {
		return this._currentSlide;
	}

	get currentSlide(): CarouselImage<unknown> {
		return this._slides[ this._currentSlide ];
	}

	get size(): number {
		return this._slides.length;
	}

	// Swipe -->
	right( steps: number = 1 ) {
		this._currentSlide = ( this._currentSlide + steps ) % this.size;
	}

	// Swipe <--
	left( steps: number = 1 ) {
		this._currentSlide =
			( this._currentSlide + this.size - steps ) % this.size;
	}

	toSlide( index: Index ) {
		this._currentSlide = Math.abs( index ) % this.size;
	}


	/*----------  Touch Handling  ----------*/

	handleTouchStart = ( event: TouchEvent ) => {
		this.setTouchPosition( event.touches[0].clientX );
	}

	setTouchPosition = ( position: Abscissa | null ) => {
		this._touchPosition = position;
	}

	handleTouchMove = ( event: TouchEvent ) => {
		if ( this._touchPosition === null ) {
			return;
		}

		const currentPosition = event.touches[0].clientX;
		const direction = this._touchPosition - currentPosition;

		if ( direction > this.THRESHOLD ) {
			this.right();
			this.setTouchPosition( null );
		}
		else if ( direction < -10 ) {
			this.left();
			this.setTouchPosition( null );
		}
	};

	handleTouchEnd = () => {
		this.setTouchPosition( null );
	}
}

export { Carousel };
