'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { increment, decrement } from '@/features/counter/counterSlice';

const TestRedux = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <div className="p-4">
            <h1 className="text-xl">Count: {count}</h1>
            <button onClick={() => dispatch(increment())} className="mr-2">+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    )
}

export default TestRedux