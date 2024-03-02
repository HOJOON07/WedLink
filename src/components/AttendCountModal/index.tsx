import { useModalContext } from '@/contexts/ModalContext';
import { Wedding } from '@/models/wedding';
import { useEffect, useRef, useState } from 'react';

interface AttendCountModalProps {
  wedding: Wedding;
}

export default function AttendCountModal({ wedding }: AttendCountModalProps) {
  const { open, close } = useModalContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const haveSeenModal = window.localStorage.getItem('@have-seen-modal');

  useEffect(() => {
    if (haveSeenModal === 'true') {
      return;
    }
    open({
      title: `현재 참석자: ${wedding.attendCount} 명`,
      body: (
        <div>
          <input
            ref={inputRef}
            placeholder="참석 가능 인원을 추가해주세요"
            style={{ width: '100%' }}
            type="number"
          />
        </div>
      ),
      onLeftButtonClick: () => {
        localStorage.setItem('@have-seen-modal', 'true');
        close();
      },
      onRightButtonClick: async () => {
        if (inputRef.current == null) return;
        await fetch('http://localhost:8888/wedding', {
          method: 'PUT',
          body: JSON.stringify({
            ...wedding,
            attendCount: wedding.attendCount + Number(inputRef.current.value),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        localStorage.setItem('@have-seen-modal', 'true');
        close();
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>AttendCountModal</div>;
}
