import 'reflect-metadata';
import { Container } from 'inversify';

import { BooksRepository } from './Book';

export const container = new Container();

container.bind(BooksRepository).toSelf();
