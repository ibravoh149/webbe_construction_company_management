import {createSlice} from '@reduxjs/toolkit';
import {IAttributetypes, ICategoryItem, IMachineItem} from '../../interface';

const INITIAL_STATE: {
  machines: Record<ICategoryItem['id'], IMachineItem[]>;
} = {
  machines: {},
};

const machineSlice = createSlice({
  name: 'Machine',
  initialState: INITIAL_STATE,
  reducers: {
    onAddMachine(state, action) {
      const payload = action.payload;
      //   console.log(payload)
      if (!state.machines[payload.categoryId]) {
        state.machines[payload.categoryId] = [payload];
      } else {
        state.machines[payload.categoryId].push(payload);
      }
    },

    setMachineName(state, action) {
      console.log(action.payload);
    },

    removeMachine(state, action) {
      const {categoryId, machineId} = action.payload;
      const filtered = state.machines[categoryId].filter(
        (mach, i) => mach.id !== machineId,
      );
      state.machines[categoryId] = filtered;
    },

    updateMachine(state, action) {
      const {categoryId, machineId, name, value} = action.payload;

      const machs = state.machines[categoryId];
      const filteredIndex = machs?.findIndex(
        (mach, i) => mach.id === machineId,
      ) as any;
      if (filteredIndex >= 0) {
        const filterMechine = machs[filteredIndex];
        filterMechine.values = {...filterMechine?.values, [name]: value};
        state.machines[categoryId][filteredIndex] = filterMechine;
      }
    },
  },
});

export const {onAddMachine, setMachineName, removeMachine, updateMachine} =
  machineSlice.actions;
export default machineSlice.reducer;
