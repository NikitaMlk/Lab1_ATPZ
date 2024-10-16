import Mtrx from 'mtrx';
import { expect } from 'chai';

describe('Mtrx Library Extended Functionality', function() {

    it('should create a matrix with specified rows and columns', function() {
        const matrix = new Mtrx(3, 4);
        expect(matrix.rows).to.equal(3);
        expect(matrix.cols).to.equal(4);
    });

    it('should calculate the rank of a matrix', function() {
        const matrix = new Mtrx([[1, 0, 0], [0, 1, 0], [0, 0, 0]]);
        expect(matrix.rank).to.equal(2);
    });

    it('should check if a matrix is singular', function() {
        const matrix = new Mtrx([[1, 2], [2, 4]]);
        expect(Mtrx.isSingular(matrix)).to.be.true;
    });

    it('should return a zeros matrix', function() {
        const matrix = Mtrx.zeros(2, 2);
        expect(matrix).to.deep.equal([[0, 0], [0, 0]]);
    });

    it('should return a ones matrix', function() {
        const matrix = Mtrx.ones(2, 3);
        expect(matrix).to.deep.equal([[1, 1, 1], [1, 1, 1]]);
    });

    it('should create a random matrix', function() {
        const matrix = Mtrx.rand(2, 2);
        expect(matrix.rows).to.equal(2);
        expect(matrix.cols).to.equal(2);
    });

    it('should create a diagonal matrix', function() {
        const matrix = Mtrx.diag([2, 3, 4]);
        expect(matrix).to.deep.equal([[2, 0, 0], [0, 3, 0], [0, 0, 4]]);
    });

    it('should perform matrix transposition', function() {
        const matrix = new Mtrx([[1, 2], [3, 4]]);
        const transposed = matrix.T();
        expect(transposed).to.deep.equal([[1, 3], [2, 4]]);
    });

    it('should perform LUP decomposition', function() {
        const matrix = new Mtrx([[4, 3], [6, 3]]);
        const { L, U, P } = matrix.LUP();
        expect(L).to.deep.equal([[1, 0], [0.6666666666666666, 1]]);
        expect(U).to.deep.equal([[6, 3], [0, 1]]);
        expect(P).to.deep.equal([[0, 1], [1, 0]]);
    });

    it('should calculate matrix inverse', function() {
        const matrix = new Mtrx([[4, 7], [2, 6]]);
        const invMatrix = matrix.inv();
        const expectedMatrix = [[0.6, -0.7], [-0.2, 0.4]];
        
        invMatrix.forEach((row, i) => {
            row.forEach((val, j) => {
                expect(val).to.be.closeTo(expectedMatrix[i][j], 0.0001);
            });
        });
    });

    it('should return if matrix is diagonal', function() {
        const matrix = Mtrx.diag([1, 2, 3]);
        expect(Mtrx.isDiag(matrix)).to.be.true;
    });

    it('should check for matrix equality', function() {
        const matrix1 = new Mtrx([[1, 2], [3, 4]]);
        const matrix2 = new Mtrx([[1, 2], [3, 4]]);
        expect(Mtrx.equalAll(matrix1, matrix2)).to.be.true;
    });

    it('should perform right matrix multiplication', function() {
        const matrix1 = new Mtrx([[1, 2], [3, 4]]);
        const matrix2 = new Mtrx([[1, 0], [0, 1]]);
        const result = matrix1.rightMul(matrix2);
        expect(result).to.deep.equal([[1, 2], [3, 4]]);
    });

    it('should perform left matrix multiplication', function() {
        const matrix1 = new Mtrx([[1, 2], [3, 4]]);
        const matrix2 = new Mtrx([[1, 0], [0, 1]]);
        const result = matrix2.leftMul(matrix1);
        expect(result).to.deep.equal([[1, 2], [3, 4]]);
    });
});
